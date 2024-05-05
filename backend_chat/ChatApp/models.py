from django.db import models

class Message(models.Model):
    sender = models.CharField(max_length=255)
    receiver = models.CharField(max_length=255)
    message = models.TextField()

    def __str__(self):
        return f"Sender: {self.sender}, Receiver: {self.receiver}, Message: {self.message}"