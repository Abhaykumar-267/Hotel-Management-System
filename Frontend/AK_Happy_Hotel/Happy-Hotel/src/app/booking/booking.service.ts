// // import { Injectable } from '@angular/core';

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class BookingService {

// //   constructor() { }
// // }


// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class BookingService {
//   private baseUrl = 'http://localhost:8081/bookings';

//   constructor(private http: HttpClient) {}

//   bookRoom(roomId: string, bookingDetails: any): Observable<string> {
//     return this.http.post(`${this.baseUrl}/room/${roomId}`, bookingDetails, {
//       responseType: 'text',
//     });
//   }

//   getAllBookings(): Observable<any[]> {
//     return this.http.get<any[]>(this.baseUrl);
//   }

//   findBookingByEmail(email: string): Observable<any[]> {
//     return this.http.get<any[]>(`${this.baseUrl}/user/{email}/bookings?email=${email}`);
//   }

//   cancelBooking(id: string): Observable<void> {
//     return this.http.delete<void>(`${this.baseUrl}/${id}`);
//   }
// }



/*
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseUrl = 'http://localhost:8081/bookings';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // make sure token is stored at login
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  
  bookRoom(roomId: string, bookingDetails: any): Observable<any> {
  const headers = this.getAuthHeaders();
  return this.http.post<any>(
    `${this.baseUrl}/room/${roomId}/booking`,
    bookingDetails,
    { headers }
  );
}
  getAllBookings(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/all-bookings`, { headers });
  }

  findBookingByEmail(email: string): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/user/${email}/bookings`, { headers });
  }

  getBookingByConfirmationCode(code: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/confirmation/${code}`);
  }

  cancelBooking(id: string): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.baseUrl}/booking/${id}/delete`, { headers });
  }

  // getBookingsByUserId(userId: string, token: string): Observable<any[]> {
  //   const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
  //   return this.http.get<any[]>(`${this.baseUrl}/user/${userId}/bookings`, { headers });
  // }
  // getBookingsByUserId(email: string, token: string) {
  //   const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
  //   return this.http.get<any[]>(`${this.baseUrl}/user/${email}/bookings`, { headers });
  // }
  
  getBookingsByUserId(userId: string) {
    return this.http.get(`${this.baseUrl}/bookings/user/${userId}`);
  }
}
*/



import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseUrl = 'http://localhost:8081/bookings';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  /** ✅ Book room */
  bookRoom(roomId: string, bookingDetails: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/room/${roomId}/booking`,
      bookingDetails,
      { headers: this.getAuthHeaders() }
    );
  }

  /** ✅ Get all bookings (Admin only) */
  getAllBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all-bookings`, { headers: this.getAuthHeaders() });
  }

  /** ✅ Find booking by email */
  findBookingByEmail(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${email}/bookings`, { headers: this.getAuthHeaders() });
  }

  /** ✅ Find booking by confirmation code */
  getBookingByConfirmationCode(code: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/confirmation/${code}`, { headers: this.getAuthHeaders() });
  }

  /** ✅ Cancel booking */
  cancelBooking(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/booking/${id}/delete`, { headers: this.getAuthHeaders() });
  }

  /** ✅ Get bookings by userId (fixed double /bookings bug) */
  getBookingsByUserId(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}`, { headers: this.getAuthHeaders() });
  }
}
