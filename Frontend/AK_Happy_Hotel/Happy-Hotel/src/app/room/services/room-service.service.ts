import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  [x: string]: any;
  private baseUrl = 'http://localhost:8081/rooms';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAvailableRooms(checkIn: string, checkOut: string, roomType: string): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = `${this.baseUrl}/available-rooms?checkIn=${checkIn}&checkOut=${checkOut}&roomType=${roomType}`;
    return this.http.get<any>(url, { headers });
  }

  getAllRooms(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/all-rooms`, { headers });
  }

  getRoomById(roomId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/room/${roomId}`, { headers });
  }



  addRoom(roomData: any): Observable<any> {
    const formData = new FormData();
    formData.append('photo', roomData.photo);
    formData.append('roomType', roomData.roomType);
    formData.append('roomPrice', roomData.roomPrice);

    const token = localStorage.getItem('token');
    const headers: any = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;     // ✅ add token
    }

    return this.http.post<any>(`${this.baseUrl}/add/new-room`, formData, { headers });
  }


  deleteRoom(id: string): Observable<void> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<void>(`${this.baseUrl}/delete/room/${id}`, { headers });
  }

  updateRoom(roomId: string, roomData: any): Observable<any> {
    const formData = new FormData();
    formData.append('photo', roomData.photo);
    formData.append('roomType', roomData.roomType);
    formData.append('roomPrice', roomData.roomPrice);

    const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };

    return this.http.put<any>(
      `${this.baseUrl}/update/${roomId}`,   // ✅ yaha bas url modify kiya hai
      formData,
      { headers }
    );
  }



}
