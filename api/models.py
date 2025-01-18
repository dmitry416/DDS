from django.core.exceptions import ValidationError
from django.db import models

class Status(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Type(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=100)
    type = models.ForeignKey(Type, on_delete=models.CASCADE, related_name='categories')

    def __str__(self):
        return self.name

class SubCategory(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='subcategories')

    def __str__(self):
        return self.name

class Record(models.Model):
    date = models.DateField()
    status = models.ForeignKey(Status, on_delete=models.CASCADE, related_name='records')
    type = models.ForeignKey(Type, on_delete=models.CASCADE, related_name='records')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='records')
    subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE, related_name='records')
    sum = models.DecimalField(max_digits=10, decimal_places=2)
    comment = models.TextField(blank=True, null=True)

    def clean(self):
        if not Type.objects.filter(id=self.type.id).exists():
            raise ValidationError({"error": "Указанный тип не существует."})

        if not Category.objects.filter(id=self.category.id).exists():
            raise ValidationError({"error": "Указанная категория не существует."})

        if not SubCategory.objects.filter(id=self.subcategory.id).exists():
            raise ValidationError({"error": "Указанная подкатегория не существует."})

    def __str__(self):
        return f"Record {self.id}: {self.date} - {self.sum}"