import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from './lesson.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Lesson } from './lesson.model';

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
      this.isEditMode = true;
      this.lessonService.getLessonById(Number(id)).subscribe({
        next: (lesson: Lesson) => {
          this.lesson = lesson;
        },
        error: (error) => {
          console.error('Error fetching lesson:', error);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.lessonService.updateLesson(this.lesson.id, this.lesson).subscribe({
        next: () => {
          this.router.navigate(['/lessons']);
        },
        error: (error) => {
          console.error('Error updating lesson:', error);
        }
      });
    } else {
      this.lessonService.createLesson(this.lesson).subscribe({
        next: () => {
          this.router.navigate(['/lessons']);
        },
        error: (error) => {
          console.error('Error creating lesson:', error);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/lessons']);
  }
}
