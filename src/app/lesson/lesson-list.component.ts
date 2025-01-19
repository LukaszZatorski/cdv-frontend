import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LessonService } from './lesson.service';
import { Lesson } from './lesson.model';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class LessonListComponent implements OnInit {
  lessons: Lesson[] = [];

  constructor(private lessonService: LessonService) {}

  ngOnInit(): void {
    this.lessonService.getLessons().subscribe({
      next: (lessons: Lesson[]) => {
        this.lessons = lessons;
      },
      error: (error) => {
        console.error('Error fetching lessons:', error);
      }
    });
  }

  deleteLesson(id: number): void {
    this.lessonService.deleteLesson(id).subscribe({
      next: () => {
        this.lessons = this.lessons.filter(lesson => lesson.id !== id);
      },
      error: (error) => {
        console.error(`Error deleting lesson with id ${id}:`, error);
      }
    });
  }
}
