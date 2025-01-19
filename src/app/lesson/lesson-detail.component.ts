import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from './lesson.service';
import { CommonModule } from '@angular/common';

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
      this.lessonService.getLessonById(Number(id)).then(lesson => {
        this.lesson = lesson;
      });
    } else {
      console.error('Invalid lesson ID');
    }
  }
}
