from rest_framework import serializers
from .models import Note,Share

from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(min_length=8)



    def create(self, validated_data):
        f_name = validated_data.get('first_name', None)
        l_name = validated_data.get('last_name', None)
        user = User.objects.create_user(validated_data['username'], validated_data['email'],
                                        validated_data['password'],first_name=f_name,last_name=l_name



                                        )
        return user


    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password','first_name','last_name')





class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ('id', 'author', 'note','completed')

    def create(self, validated_data):
        note = validated_data.get('note', None)

        completed=validated_data.get('completed', None)
        user = self.context.get("user")

        return Note.objects.create(note=note, author=user, completed=completed)

    def update(self, instance, validated_data):
        instance.note = validated_data.get('note', instance.note)
        instance.completed = validated_data.get('completed', instance.completed)

        return instance





class ShareSerializer(serializers.ModelSerializer):
    class Meta:
        model = Share
        fields = ('id', 'shared_by', 'shared_to','note_shared')

    def create(self, validated_data):
        shared_to = self.context.get("shared_to")
        note_shared = self.context.get("note_shared")
        shared_by = self.context.get("user")

        return Share.objects.create(shared_to=shared_to, shared_by=shared_by, note_shared=note_shared)




