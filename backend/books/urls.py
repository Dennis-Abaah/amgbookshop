from django.urls import path
from . import views

urlpatterns = [
    path('books/', views.list_books, name='list-books'),
    path('books/add/', views.add_book, name='add-book'),
    path('books/<int:book_id>/delete/', views.delete_book, name='delete-book'),
    path('stats/', views.book_stats, name='book-stats'),
    path('login/', views.admin_login, name='admin-login'),
    path('logout/', views.admin_logout, name='admin-logout'),
]
