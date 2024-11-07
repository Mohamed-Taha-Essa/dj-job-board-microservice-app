
# DJ-Job-Board Microservice App

This project is a **full-stack microservice-based job board application** built using **Django** for the backend and **Next.js** for the frontend. The backend is divided into three core services: **Jobs**, **Blog**, and **Users**. Each service is implemented as a separate Django app and exposed via RESTful APIs. The frontend communicates with these APIs, uses modern UI design with **ShadCN**, and is styled with **Tailwind CSS**. It also leverages **Zustand** for state management and **SWR** for data fetching.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Backend Services](#backend-services)
  - [Job Service](#job-service)
  - [Blog Service](#blog-service)
  - [User Service](#user-service)
- [Frontend with Next.js](#frontend-with-nextjs)
  - [App Structure](#app-structure)
  - [Components](#components)
  - [UI Design](#ui-design)
  - [State Management with Zustand](#state-management-with-zustand)
  - [Data Fetching with SWR](#data-fetching-with-swr)
  - [ShadCN & Tailwind CSS](#shadcn--tailwind-css)
  - [TypeScript in route.ts](#typescript-in-routets)
- [Environment Setup](#environment-setup)
- [Docker Setup](#docker-setup)
- [API Documentation](#api-documentation)

---

## Project Overview

The DJ-Job-Board Microservice App is a full-stack job board system that provides functionality for job listings, applications, blog posts, likes, comments, and user authentication. This application uses a **microservices architecture** where each service (Jobs, Blog, Users) is implemented as a separate Django app. These services interact with each other via **RESTful APIs**.

### Key Features:
- **Jobs**: Job listings, job applications, and filtering by criteria such as salary and location.
- **Blog**: Blog posts with features for liking and commenting on posts.
- **Users**: User authentication (sign up, login), profile management, and token-based authorization.

---

## Backend Services

The backend is built using **Django** and consists of three key services: **Jobs**, **Blog**, and **Users**.

---

### Job Service

The **Job Service** is responsible for handling job listings, job details, and job applications. It allows users to post jobs and apply to them.

#### Models

- **Job**: Represents a job posting with attributes like job title, description, salary, and location.
- **JobApply**: Represents an application for a specific job by a user.

```python
from django.db import models
from django.contrib.auth.models import User

class Job(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    posted_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class JobApply(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} applied to {self.job.title}"
```

#### APIs
- **POST /jobs/**: Create a new job posting.
- **GET /jobs/**: List all job postings with filtering support.
- **GET /jobs/{id}/**: Get a specific job posting by ID.
- **POST /jobs/{id}/apply/**: Apply for a job posting.

#### Views & Serializers

- **JobViewSet**: Handles CRUD operations for job listings.
- **JobApplyViewSet**: Manages job applications.

```python
from rest_framework import viewsets
from .models import Job, JobApply
from .serializers import JobSerializer, JobApplySerializer

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class JobApplyViewSet(viewsets.ModelViewSet):
    queryset = JobApply.objects.all()
    serializer_class = JobApplySerializer
```

#### Key Endpoints:
- **POST /jobs/**: Create a job posting.
- **GET /jobs/**: Get a list of all job postings, with optional filters for salary and location.
- **POST /jobs/{id}/apply/**: Apply for a specific job.

---

### Blog Service

The **Blog Service** enables users to create blog posts, like posts, and comment on them.

#### Models

- **Post**: Represents a blog post with fields like title, content, and published date.
- **Like**: Represents a like on a post.
- **Comment**: Represents a comment on a post.

```python
from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    published_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username} liked {self.post.title}"

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.TextField()
    commented_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.username} on {self.post.title}"
```

#### APIs
- **POST /posts/**: Create a new blog post.
- **GET /posts/**: List all blog posts.
- **GET /posts/{id}/**: Get a specific blog post.
- **POST /posts/{id}/like/**: Like a blog post.
- **POST /posts/{id}/comment/**: Comment on a blog post.

#### Views & Serializers

- **PostViewSet**: Handles CRUD operations for blog posts.
- **LikeViewSet**: Manages likes for posts.
- **CommentViewSet**: Handles comments on posts.

```python
from rest_framework import viewsets
from .models import Post, Like, Comment
from .serializers import PostSerializer, LikeSerializer, CommentSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
```

#### Key Endpoints:
- **POST /posts/**: Create a blog post.
- **GET /posts/**: List all blog posts.
- **POST /posts/{id}/like/**: Like a blog post.
- **POST /posts/{id}/comment/**: Comment on a blog post.

---

### User Service

The **User Service** handles authentication (sign-up, login), profile management, and user tokens for authorization.

#### Models

- **User**: Inherits from the Django `AbstractUser`, adding custom fields like `phone_number` and `profile_picture`.

```python
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    profile_picture = models.ImageField(upload_to="profile_pics/", null=True, blank=True)
```

#### APIs
- **POST /users/signup/**: Register a new user.
- **POST /users/login/**: Log in and receive an authentication token.
- **GET /users/profile/**: Get the logged-in user's profile details.
- **PUT /users/profile/**: Update the user's profile.

#### Views & Serializers

- **UserViewSet**: Handles user registration and login.
- **ProfileViewSet**: Manages profile updates.

```python
from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer, ProfileSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
```

#### Key Endpoints:
- **POST /users/signup/**: Register a new user.
- **POST /users/login/**: Login and receive token.
- **GET /users/profile/**: Get profile details of the logged-in user.
- **PUT /users/profile/**: Update user profile.

---

## Frontend with Next.js

### App Structure

The frontend is built using **Next.js** and is organized as follows:
- **/pages**: Contains pages for Blog, Jobs, Account management, and API interaction.
- **/components**: Reusable components like Navbar, Job Card, Blog Post Card, etc.
- **/stores**: State

 management for Blog and Jobs using **Zustand**.
- **/ui**: Contains UI components styled using **Tailwind CSS** and **ShadCN**.

### Components

- **Navbar**: The global navigation bar with dark mode toggle, links to Blog, Jobs, and Account sections.
- **Job Card**: Displays a summary of a job listing.
- **Blog Post Card**: Displays a summary of a blog post.
- **Dark Mode**: Toggle between light and dark modes using the **ShadCN** component library.

### UI Design

Styled with **Tailwind CSS**, offering a responsive and clean design. **ShadCN** components provide pre-designed elements for a modern user experience.

### State Management with Zustand

State management for both **Blog** and **Job** services is handled by **Zustand**, ensuring a clean and performant solution for managing application state.

### Data Fetching with SWR

Data fetching for dynamic content like job listings, blog posts, and user data is handled by **SWR**, providing real-time data updates with caching and revalidation.

### ShadCN & Tailwind CSS

**ShadCN** is used for modern UI components, and **Tailwind CSS** provides utility-first styling.

### TypeScript in route.ts

The routing for API calls is handled in **route.ts** using TypeScript for better type safety and improved code quality.

---

## Environment Setup

To configure the environment variables for backend services, create a `.env` file:

```
DJANGO_SECRET_KEY=<your-secret-key>
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
DB_HOST=localhost
DB_PORT=5432
_DB=<your-database-name>
POSTGRES_USER=<your-database-user>
POSTGRES_PASSWORD=<your-database-password>
```

---

## Docker Setup

Run the application using **Docker Compose**.

```bash
docker-compose up --build
```

---

## API Documentation

Interactive API documentation for each service:

- **Blog Service**: [http://localhost:8003/swagger/](http://localhost:8003/swagger/)
- **Job Service**: [http://localhost:8002/swagger/](http://localhost:8002/swagger/)
- **User Service**: [http://localhost:8001/swagger/](http://localhost:8001/swagger/)

