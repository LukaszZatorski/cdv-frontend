import { Injectable } from '@angular/core';
import axios from 'axios';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private authService: AuthService) {}

  async getLessons(): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}lessons`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching lessons:', error);
      if (error.response && error.response.data.message === 'Invalid JWT Token') {
        console.error('Invalid JWT Token, logging out');
        this.authService.logout();
      } else {
        console.error('An error occurred:', error.message);
      }
      throw error;
    }
  }

  async getLessonById(id: number): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}lessons/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Error fetching lesson with id ${id}:`, error);
      if (error.response && error.response.data.message === 'Invalid JWT Token') {
        console.error('Invalid JWT Token, logging out');
        this.authService.logout();
      }
      throw error;
    }
  }

  async createLesson(lessonData: any): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}lessons`, lessonData);
      return response.data;
    } catch (error: any) {
      console.error('Error creating lesson:', error);
      if (error.response && error.response.data.message === 'Invalid JWT Token') {
        console.error('Invalid JWT Token, logging out');
        this.authService.logout();
      }
      throw error;
    }
  }

  async updateLesson(id: number, lessonData: any): Promise<any> {
    try {
      const response = await axios.put(`${this.apiUrl}lessons/${id}`, lessonData);
      return response.data;
    } catch (error: any) {
      console.error(`Error updating lesson with id ${id}:`, error);
      if (error.response && error.response.data.message === 'Invalid JWT Token') {
        console.error('Invalid JWT Token, logging out');
        this.authService.logout();
      }
      throw error;
    }
  }

  async deleteLesson(id: number): Promise<void> {
    try {
      await axios.delete(`${this.apiUrl}lessons/${id}`);
    } catch (error: any) {
      console.error(`Error deleting lesson with id ${id}:`, error);
      if (error.response && error.response.data.message === 'Invalid JWT Token') {
        console.error('Invalid JWT Token, logging out');
        this.authService.logout();
      }
      throw error;
    }
  }
}
