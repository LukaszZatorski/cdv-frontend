import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor() {}

  async getLessons(): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}lessons`);
      return response.data;
    } catch (error) {
      console.error('Error fetching lessons:', error);
      throw error;
    }
  }

  async getLessonById(id: number): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}lessons/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching lesson with id ${id}:`, error);
      throw error;
    }
  }

  async createLesson(lessonData: any): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}lessons`, lessonData);
      return response.data;
    } catch (error) {
      console.error('Error creating lesson:', error);
      throw error;
    }
  }

  async updateLesson(id: number, lessonData: any): Promise<any> {
    try {
      const response = await axios.put(`${this.apiUrl}lessons/${id}`, lessonData);
      return response.data;
    } catch (error) {
      console.error(`Error updating lesson with id ${id}:`, error);
      throw error;
    }
  }

  async deleteLesson(id: number): Promise<void> {
    try {
      await axios.delete(`${this.apiUrl}lesson/${id}`);
    } catch (error) {
      console.error(`Error deleting lesson with id ${id}:`, error);
      throw error;
    }
  }
}
