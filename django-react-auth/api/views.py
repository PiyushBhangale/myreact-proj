from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import logout
from django.shortcuts import get_object_or_404


from rest_framework import viewsets, response, permissions
from rest_framework.decorators import permission_classes, api_view, authentication_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .models import Note,Share
from .serializers import NoteSerializer,ShareSerializer
from rest_framework.parsers import JSONParser

from .serializers import UserSerializer


from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView



@csrf_exempt
def create_user(request):
    print("in creat user")

    if request.method == 'GET':

        snippets = User.objects.all()
        serializer = UserSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        print(request.POST,"request")


        # data = JSONParser().parse(request.POST)
        serializer = UserSerializer(data=request.POST)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)





class UserViewSet(viewsets.ModelViewSet):


    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def retrieve(self, request, pk=None):
        if pk == 'i':
            global current_user
            current_user=request.user
            # print("currenttttt_in_user", request.user.username)

            return response.Response(UserSerializer(request.user,
                context={'request':request}).data)
        return super(UserViewSet, self).retrieve(request, pk)


# class UserCreate(APIView):
#     """
#     Creates the user.
#     """
#
#     def post(self, request, format='json'):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             if user:
#                 json = serializer.data
#                 return Response(json, status=status.HTTP_201_CREATED)
#
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




def note_list(request):
    """
    List all code snippets, or create a new snippet.
    
    """

    if request.method == 'GET':

        notes = Note.objects.filter(author=request.session['user_id'])




        serializer = NoteSerializer(notes, many=True)
        return JsonResponse(serializer.data, safe=False)


def all_note_list(request):
    """
    List all code snippets, or create a new snippet.

    """

    if request.method == 'GET':
        notes = Note.objects.all()

        serializer = NoteSerializer(notes, many=True)
        return JsonResponse(serializer.data, safe=False)



def completed_note_list(request):
    """
    List all code snippets, or create a new snippet.

    """

    if request.method == 'GET':
        notes = Note.objects.filter(author=request.session['user_id'], completed=True)


        serializer = NoteSerializer(notes, many=True)
        return JsonResponse(serializer.data, safe=False)







def PostList(request):
    if request.method == 'GET':

        note = Note.objects.get()


        serializer = NoteSerializer(note, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':


        # data = JSONParser().parse(request.POST)
        serializer = NoteSerializer(data=request.POST,context={'user':request.user})
        if serializer.is_valid():
            serializer.save()

            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)



def Markcompleted(request):
    if request.method == 'GET':

        note = Note.objects.all()


        serializer = NoteSerializer(note, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        print("completed_dta",request.POST)
        print("postid",request.POST['id'])


        this_note = Note.objects.get(id=request.POST['id'])
        # data = JSONParser().parse(request.POST)
        serializer = NoteSerializer(this_note, data=request.POST,context={'user':request.user},partial=True)

        if serializer.is_valid():
            updated=serializer.save()
            print(updated.completed,"updateddd")
            updated.save()


            print(serializer.data,"serializerrr")
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)




def check_auth(request):
    if request.method == 'GET':
        all_user = User.objects.all()
        serializer = UserSerializer(all_user, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        print(request.POST, "noteee postttt")
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        print(user.username,"user")
        if user is not None:
            if user.is_active:
                request.session['username'] = user.username
                request.session['user_id'] = user.id
                request.session.save()
                current_active=request.session['user_id']
                print(request.session['user_id'],'session_active')

                login(request, user)
                return HttpResponse(current_active)
            else:
                 return HttpResponse(status=404)
        else:
            return HttpResponse(status=404)
    elif request.method == 'DELETE':
        print(request.session['user_id'], "inside delete")
        request.session.delete()


        logout(request)


        return HttpResponse(status=204)







def user_details(request):
    """
    Retrieve, update or delete a code snippet.
    
    """

    try:
        print(request.session['user_id'],"inside user_details")
        post = User.objects.get(id=request.session['user_id'])
    except User.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = UserSerializer(post)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = UserSerializer(post, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        post.delete()
        return HttpResponse(status=204)

def all_users(request):
    try:
        all_use = User.objects.all()
    except User.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':

        serializer = UserSerializer(all_use,many=True)
        return JsonResponse(serializer.data, safe=False)





def create_share(request):
    if request.method == 'GET':

        shared = Share.objects.all()

        serializer = ShareSerializer(shared, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':

        # data = JSONParser().parse(request.POST)
        print(request.POST,"shareddddd")
        note_pk=request.POST['note_shared']
        user_pk = request.POST['shared_to']
        print(note_pk, "notepkkk")
        note=get_object_or_404(Note,pk=note_pk)
        print(note, "noteeee")

        user_id=User.objects.get(pk=user_pk)
        print(user_id, "userrr")
        serializer = ShareSerializer(data=request.POST,context={'user': request.user,'note_shared':note,'shared_to':user_id})
        if serializer.is_valid():
            serializer.save()

            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)



