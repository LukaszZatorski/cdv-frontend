import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from './lesson.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lesson-form',
  templateUrl: './lesson-form.component.html',
  styleUrls: ['./lesson-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LessonFormComponent implements OnInit {
  lesson: any = { name: '', description: '' };
  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lessonService: LessonService
  ) {}

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

  onSubmit(): void {
    if (this.isEditMode) {
      this.lessonService.updateLesson(this.lesson.id, this.lesson).then(() => {
        this.router.navigate(['/lessons']);
      });
    } else {
      this.lessonService.createLesson(this.lesson).then(() => {
        this.router.navigate(['/lessons']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/lessons']);
  }
}
