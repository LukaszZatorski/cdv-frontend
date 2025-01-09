import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LessonService } from './lesson.service';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class LessonListComponent implements OnInit {
  lessons: any[] = [];

  constructor(private lessonService: LessonService) {}

  ngOnInit(): void {
    this.lessonService.getLessons().then(lessons => {
      this.lessons = lessons;
    });
  }

  deleteLesson(id: number): void {
    this.lessonService.deleteLesson(id).then(() => {
      this.lessons = this.lessons.filter(lesson => lesson.id !== id);
    });
  }
}
