import base64
import requests

from django.conf import settings
from django.contrib.auth import authenticate
from django.db.models import Count

from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from .models import Book
from .serializers import BookSerializer


def upload_to_imgbb(image_file):
    """Upload an image to ImgBB and return the URL."""
    image_data = base64.b64encode(image_file.read()).decode('utf-8')
    
    response = requests.post(
        'https://api.imgbb.com/1/upload',
        data={
            'key': settings.IMGBB_API_KEY,
            'image': image_data,
        }
    )
    
    if response.status_code == 200:
        data = response.json()
        return data['data']['url']
    else:
        return None


@api_view(['GET'])
@permission_classes([AllowAny])
def list_books(request):
    """List all books - public endpoint."""
    books = Book.objects.all()
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def add_book(request):
    """Add a new book - admin only."""
    title = request.data.get('title')
    description = request.data.get('description')
    category = request.data.get('category')
    price = request.data.get('price', 50)
    image_file = request.FILES.get('image')

    if not all([title, description, category, image_file]):
        return Response(
            {'error': 'All fields are required: title, description, category, image'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Upload image to ImgBB
    image_url = upload_to_imgbb(image_file)
    
    if not image_url:
        return Response(
            {'error': 'Failed to upload image to ImgBB. Please try again.'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    book = Book.objects.create(
        title=title,
        description=description,
        image=image_url,
        category=category,
        price=price,
    )

    serializer = BookSerializer(book)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_book(request, book_id):
    """Delete a book - admin only."""
    try:
        book = Book.objects.get(id=book_id)
        book.delete()
        return Response({'message': 'Book deleted successfully'}, status=status.HTTP_200_OK)
    except Book.DoesNotExist:
        return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def book_stats(request):
    """Get book statistics - admin only."""
    total = Book.objects.count()
    
    category_counts = Book.objects.values('category').annotate(count=Count('id'))
    stats = {
        'total': total,
        'spiritual_growth': 0,
        'ministry_leadership': 0,
        'relationships_family': 0,
        'personal_development': 0,
        'business_finance': 0,
        'communication_influence': 0,
        'purpose_destiny': 0,
    }
    
    for item in category_counts:
        if item['category'] in stats:
            stats[item['category']] = item['count']

    return Response(stats)


@api_view(['POST'])
@permission_classes([AllowAny])
def admin_login(request):
    """Login endpoint for admin dashboard."""
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response(
            {'error': 'Username and password are required.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = authenticate(username=username, password=password)

    if user is None:
        return Response(
            {'error': 'Invalid username or password.'},
            status=status.HTTP_401_UNAUTHORIZED
        )

    if not user.is_staff:
        return Response(
            {'error': 'You do not have admin privileges.'},
            status=status.HTTP_403_FORBIDDEN
        )

    token, _ = Token.objects.get_or_create(user=user)

    return Response({
        'token': token.key,
        'username': user.username,
    })


@api_view(['POST'])
def admin_logout(request):
    """Logout endpoint - delete token."""
    if request.auth:
        request.auth.delete()
    return Response({'message': 'Logged out successfully'})
