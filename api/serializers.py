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
    status = serializers.PrimaryKeyRelatedField(queryset=Status.objects.all(), write_only=True)
    type = serializers.PrimaryKeyRelatedField(queryset=Type.objects.all(), write_only=True)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), write_only=True)
    subcategory = serializers.PrimaryKeyRelatedField(queryset=SubCategory.objects.all(), write_only=True)

    status_detail = StatusSerializer(source='status', read_only=True)
    type_detail = TypeSerializer(source='type', read_only=True)
    category_detail = CategorySerializer(source='category', read_only=True)
    subcategory_detail = SubCategorySerializer(source='subcategory', read_only=True)

    class Meta:
        model = Record
        fields = [
            'id', 'date', 'status', 'type', 'category', 'subcategory',
            'status_detail', 'type_detail', 'category_detail', 'subcategory_detail',
            'sum', 'comment'
        ]

    def validate(self, data):
        required_fields = ['sum', 'type', 'category', 'subcategory']
        for field in required_fields:
            if field not in data:
                raise serializers.ValidationError({"error": f"Поле {field} обязательно."})
        return data
