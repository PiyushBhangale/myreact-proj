from __future__ import unicode_literals

# Create your models here.
from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Note(models.Model):
	note = models.CharField(max_length=255,null=True,blank=True,unique=True)

	completed = models.BooleanField(default=False)
	author = models.ForeignKey(User,null=True,blank=True)



class Share(models.Model):
	shared_by=models.ForeignKey(User,null=True,blank=True,related_name='shared_by')
	shared_to=models.ForeignKey(User,null=True,blank=True,related_name='shared_to')
	note_shared=models.ForeignKey(Note,null=True,blank=True)