from django.contrib import admin
from .models import Book


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'price', 'created_at')
    list_filter = ('category',)
    search_fields = ('title', 'description')
