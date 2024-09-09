from django.db import models
from django.utils import timezone

from django.utils.text import slugify

JOB_TYPE = (
    ('Internship','Internship'),
    ('PartTime','PartTime'),
    ('FullTime','FullTime'),
    ('Contract','Contract'),
)

EDUCATION_TYPE = (
    ('PHD','PHD'),
    ('Master','Master'),
    ('Bachelor','Bachelor'),
)

EXPERIENCE_TYPE = (
    ('NoExperience','NoExperience'),
    ('Junior','Junior'),
    ('MidLevel','MidLevel'),
    ('Senior','Senior'),
)

# Create your models here.
class Job(models.Model):
    title = models.CharField(max_length=50)
  
    description =models.TextField(max_length=10000)
    job_type = models.CharField(choices=JOB_TYPE, max_length=50)
    education = models.CharField(choices=EDUCATION_TYPE, max_length=50)
    experience = models.CharField(choices=EXPERIENCE_TYPE, max_length=50)
    salary =models.IntegerField(null=True ,blank= True)
    position = models.CharField(max_length=100)
    due_date =models.DateField()
    created_at =models.DateTimeField(default=timezone.now)
    slug = models.SlugField(null=True ,blank=True) 
   
    user = models.IntegerField() 
    company  = models.CharField( max_length=50)

    def save(self, *args, **kwargs):
       self.slug = slugify(self.title)
       super(Job, self).save(*args, **kwargs) # Call the real save() method

    def __str__(self):
        return self.title
    

class JobApply(models.Model):
    user = models.IntegerField()
    resume = models.FileField(upload_to='resume')
    cover_letter = models.TextField(max_length=10000)
    job = models.ForeignKey(Job , related_name='job_apply' ,on_delete= models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.job)