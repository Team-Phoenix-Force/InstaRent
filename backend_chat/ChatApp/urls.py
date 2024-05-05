from django.urls import path
from . import views

urlpatterns = [
    path('messages/<str:username>/', views.MessageView, name='message_view'),
    path('chat/<str:mainUser>/<str:otherUser>/', views.ChatView, name='chat_view'),
    path('send/<str:sender>/<str:receiver>/', views.SendMessage, name='send_message'),
    # path('search', views.SearchView, name='search_view'),
]