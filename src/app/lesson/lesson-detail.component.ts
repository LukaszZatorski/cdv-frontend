import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from './lesson.service';
import { CommonModule } from '@angular/common';
import { Lesson } from './lesson.model';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class LessonDetailComponent implements OnInit {
  lesson: any;

  constructor(private route: ActivatedRoute, private lessonService: LessonService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && Number.isInteger(Number(id))) {
      this.lessonService.getLessonById(Number(id)).subscribe({
        next: (lesson: Lesson) => {
          this.lesson = lesson;
        },
        error: (error) => {
          console.error('Error fetching lesson:', error);
        }
      });
    } else {
      console.error('Invalid lesson ID');
    }
  }
}
