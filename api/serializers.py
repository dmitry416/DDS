from rest_framework import serializers
from .models import Record, Status, Type, Category, SubCategory


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = ['id', 'name']


class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = ['id', 'name']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'type']


class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ['id', 'name', 'category']


class RecordSerializer(serializers.ModelSerializer):
    status = StatusSerializer()
    type = TypeSerializer()
    category = CategorySerializer()
    subcategory = SubCategorySerializer()

    class Meta:
        model = Record
        fields = ['id', 'date', 'status', 'type', 'category', 'subcategory', 'sum', 'comment']

    def validate(self, data):
        required_fields = ['sum', 'type', 'category', 'subcategory']
        for field in required_fields:
            if field not in data:
                raise serializers.ValidationError({"error": f"Поле {field} обязательно."})
        return data
