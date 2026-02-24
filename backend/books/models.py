from django.db import models


class Book(models.Model):
    CATEGORY_CHOICES = [
        ('spiritual_growth', 'Spiritual Growth & Discipleship'),
        ('ministry_leadership', 'Ministry & Leadership'),
        ('relationships_family', 'Relationships & Family'),
        ('personal_development', 'Personal Development'),
        ('business_finance', 'Business & Finance'),
        ('communication_influence', 'Communication & Influence'),
        ('purpose_destiny', 'Purpose & Destiny'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.URLField(max_length=1000, help_text="ImgBB image URL")
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=50.00)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
