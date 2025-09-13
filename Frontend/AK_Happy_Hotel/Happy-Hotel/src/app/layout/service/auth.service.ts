// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private redirectKey = 'redirectUrl';
//   private loginUrl = 'http://localhost:8081/auth/login';
//   private baseURL = 'http://localhost:8081';

//   // 🔁 Real-time state management
//   private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
//   private userRoleSubject = new BehaviorSubject<string | null>(localStorage.getItem('userRole'));
//   private userNameSubject = new BehaviorSubject<string | null>(localStorage.getItem('userName')); // ✅ new

//   // 🔓 Exposed observables
//   isLoggedIn$ = this.isLoggedInSubject.asObservable();
//   userRole$ = this.userRoleSubject.asObservable();
//   userName$ = this.userNameSubject.asObservable(); // ✅ new

//   constructor(private http: HttpClient) {}
//   private getHeaders(): HttpHeaders {
//     const token = localStorage.getItem('token');
//     return new HttpHeaders({
//       'Content-Type': 'application/json',
//       ...(token ? { Authorization: `Bearer ${token}` } : {})
//     });
//   }

//   loginUser(credentials: { email: string; password: string }): Observable<any> {
//     return this.http.post<any>(this.loginUrl, credentials);
//   }

//   // 👇 token + role + name set karna
//   handleLogin(token: string, role: string = '',name: string = ''): void {
//     localStorage.setItem('token', token);
//     if (role) {
//       localStorage.setItem('userRole', role);
//       this.userRoleSubject.next(role);
//     }
//     if (name) {  // ✅ store username
//       localStorage.setItem('userName', name);
//       this.userNameSubject.next(name);
//     }
//     if (userId) {
//     localStorage.setItem('userId', userId);
//   }
//     this.isLoggedInSubject.next(true);
//   }

//   private logoutMessageSubject = new BehaviorSubject<string | null>(null);
//   logoutMessage$ = this.logoutMessageSubject.asObservable();

//   logout(): void {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userRole');
//     localStorage.removeItem('userName');
//     this.isLoggedInSubject.next(false);
//     this.userRoleSubject.next(null);
//     this.userNameSubject.next(null);

//     // ✅ message dikhana
//     this.logoutMessageSubject.next("You have successfully logged out");

//     // ✅ 3 sec baad hata dena
//     setTimeout(() => {
//       this.logoutMessageSubject.next(null);
//     }, 3000);
//   }

//   isLoggedIn(): boolean {
//     return this.isLoggedInSubject.value;
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   getUserRole(): string | null {
//     return this.userRoleSubject.value;
//   }

//   getUserName(): string | null {   // ✅ getter
//     return this.userNameSubject.value;
//   }

//   setRedirectUrl(url: string): void {
//     localStorage.setItem(this.redirectKey, url);
//   }

//   getRedirectUrl(): string {
//     return localStorage.getItem(this.redirectKey) || '/';
//   }

//   // 🔐 Check for token existence
//   private hasToken(): boolean {
//     return !!localStorage.getItem('token');
//   }

//   registerUser(userData: any) {
//     return this.http.post('http://localhost:8081/auth/register-user', userData);
//   }

//   getUser(userId: string, token: string): Observable<any> {
//     const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
//     return this.http.get<any>(`${this.baseURL}/users/${userId}`, { headers });
//   }

//   deleteUser(userId: string): Observable<any> {
//     return this.http.delete<any>(`${this.baseURL}/users/delete/${userId}`);
//   }

// }





// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private redirectKey = 'redirectUrl';
//   private loginUrl = 'http://localhost:8081/auth/login';
//   private baseURL = 'http://localhost:8081';

//   private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
//   private userRoleSubject = new BehaviorSubject<string | null>(localStorage.getItem('userRole'));
//   private userNameSubject = new BehaviorSubject<string | null>(localStorage.getItem('userName'));
//   private userIdSubject = new BehaviorSubject<string | null>(localStorage.getItem('userId'));

//   isLoggedIn$ = this.isLoggedInSubject.asObservable();
//   userRole$ = this.userRoleSubject.asObservable();
//   userName$ = this.userNameSubject.asObservable();
//   userId$ = this.userIdSubject.asObservable();

//   private logoutMessageSubject = new BehaviorSubject<string | null>(null);
//   logoutMessage$ = this.logoutMessageSubject.asObservable();

//   constructor(private http: HttpClient) {}

//   private getHeaders(): HttpHeaders {
//     const token = localStorage.getItem('token');
//     return new HttpHeaders({
//       'Content-Type': 'application/json',
//       ...(token ? { Authorization: `Bearer ${token}` } : {})
//     });
//   }

//   loginUser(credentials: { email: string; password: string }): Observable<any> {
//     return this.http.post<any>(this.loginUrl, credentials);
//   }

//   handleLogin(token: string, role: string = '', name: string = '', userId: string = ''): void {
//     localStorage.setItem('token', token);
//     if (role) {
//       localStorage.setItem('userRole', role);
//       this.userRoleSubject.next(role);
//     }
//     if (name) {
//       localStorage.setItem('userName', name);
//       this.userNameSubject.next(name);
//     }
//     if (userId) {
//       localStorage.setItem('userId', userId);
//       this.userIdSubject.next(userId);
//     }
//     this.isLoggedInSubject.next(true);
    
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userRole');
//     localStorage.removeItem('userName');
//     localStorage.removeItem('userId');
//     this.isLoggedInSubject.next(false);
//     this.userRoleSubject.next(null);
//     this.userNameSubject.next(null);
//     this.userIdSubject.next(null);

//     this.logoutMessageSubject.next("You have successfully logged out");

//     setTimeout(() => {
//       this.logoutMessageSubject.next(null);
//     }, 3000);
//   }

//   isLoggedIn(): boolean {
//     return this.isLoggedInSubject.value;
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   getUserRole(): string | null {
//     return this.userRoleSubject.value;
//   }

//   getUserName(): string | null {
//     return this.userNameSubject.value;
//   }

//   getUserId(): string | null {
//     return this.userIdSubject.value;
//   }

//   setRedirectUrl(url: string): void {
//     localStorage.setItem(this.redirectKey, url);
//   }

//   getRedirectUrl(): string {
//     return localStorage.getItem(this.redirectKey) || '/';
//   }

  // private hasToken(): boolean {
  //   return !!localStorage.getItem('token');
  // }

//   registerUser(userData: any) {
//     return this.http.post(`${this.baseURL}/auth/register-user`, userData);
//   }

//   // getUser(userId: string, token: string): Observable<any> {
//   //   const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
//   //   return this.http.get<any>(`${this.baseURL}/users/${userId}`, { headers });
//   // }

//   // deleteUser(userId: string): Observable<any> {
//   //   return this.http.delete<any>(`${this.baseURL}/users/delete/${userId}`);
//   // }

//   // Helper to persist login response shaped like { email, token, roles }
//   handleLoginResponse(resp: any) {
//     if (resp?.email) localStorage.setItem('email', resp.email);
//     if (resp?.jwt) localStorage.setItem('token', resp.jwt);
//     if (resp?.id) {
//       localStorage.setItem('userId', resp.id);   // 👈 yeh important
//     }
//     if (resp?.roles) localStorage.setItem('userRole', Array.isArray(resp.roles) ? resp.roles.join(',') : String(resp.roles));
//   }



//   getEmail(): string | null { return localStorage.getItem('email'); }

//   getUser(userId: string) {
//     return this.http.get(`${this.baseURL}/users/${userId}`);
//   }

//   deleteUser(email: string) {
//     return this.http.delete(`${this.baseURL}/users/delete/${email}`);
//   }

//   getUserByEmail(email: string) {
//     return this.http.get(`${this.baseURL}/users/${email}`);
//   }


  
// }









// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, BehaviorSubject } from 'rxjs';
// import { jwtDecode } from 'jwt-decode';  // 👈 correct import

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private redirectKey = 'redirectUrl';
//   private loginUrl = 'http://localhost:8081/auth/login';
//   private baseURL = 'http://localhost:8081';

//   private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
//   private userRoleSubject = new BehaviorSubject<string | null>(localStorage.getItem('userRole'));
//   private userNameSubject = new BehaviorSubject<string | null>(localStorage.getItem('userName'));
//   private userIdSubject = new BehaviorSubject<string | null>(localStorage.getItem('userId'));
//   private userEmailSubject = new BehaviorSubject<string | null>(localStorage.getItem('email')); // ✅ added

//   isLoggedIn$ = this.isLoggedInSubject.asObservable();
//   userRole$ = this.userRoleSubject.asObservable();
//   userName$ = this.userNameSubject.asObservable();
//   userId$ = this.userIdSubject.asObservable();
//   userEmail$ = this.userEmailSubject.asObservable(); // ✅ added

//   private logoutMessageSubject = new BehaviorSubject<string | null>(null);
//   logoutMessage$ = this.logoutMessageSubject.asObservable();

//   constructor(private http: HttpClient) {}

//   private getHeaders(): HttpHeaders {
//     const token = localStorage.getItem('token');
//     return new HttpHeaders({
//       'Content-Type': 'application/json',
//       ...(token ? { Authorization: `Bearer ${token}` } : {})
//     });
//   }

//   /** ✅ Login */
//   loginUser(credentials: { email: string; password: string }): Observable<any> {
//     return this.http.post<any>(this.loginUrl, credentials);
//   }

//   /** ✅ Handle login response */
//   handleLogin(token: string, role: string = '', name: string = '', userId: string = '', email: string = ''): void {
//     localStorage.setItem('token', token);
//     if (role) {
//       localStorage.setItem('userRole', role);
//       this.userRoleSubject.next(role);
//     }
//     if (name) {
//       localStorage.setItem('userName', name);
//       this.userNameSubject.next(name);
//     }
//     if (userId) {
//       localStorage.setItem('userId', userId);
//       this.userIdSubject.next(userId);
//     }
//     if (email) {   // ✅ FIX
//       localStorage.setItem('email', email);
//       this.userEmailSubject.next(email);
//     }
//     this.isLoggedInSubject.next(true);
//   }

//   /** ✅ Logout */
//   logout(): void {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userRole');
//     localStorage.removeItem('userName');
//     localStorage.removeItem('userId');
//     localStorage.removeItem('email'); // ✅ FIX
//     this.isLoggedInSubject.next(false);
//     this.userRoleSubject.next(null);
//     this.userNameSubject.next(null);
//     this.userIdSubject.next(null);
//     this.userEmailSubject.next(null); // ✅ FIX

//     this.logoutMessageSubject.next("You have successfully logged out");
//     setTimeout(() => {
//       this.logoutMessageSubject.next(null);
//     }, 3000);
//   }

//   /** ✅ Helpers */
//   isLoggedIn(): boolean { return this.isLoggedInSubject.value; }
//   getToken(): string | null { return localStorage.getItem('token'); }
//   getUserRole(): string | null { return this.userRoleSubject.value; }
//   getUserName(): string | null { return this.userNameSubject.value; }
//   getUserId(): string | null { return this.userIdSubject.value; }
//   getEmail(): string | null { return this.userEmailSubject.value; } // ✅ FIX

//   /** ✅ JWT decode helper */
//   decodeToken(): any {
//     const token = this.getToken();
//     if (!token) return null;
//     try {
//       return jwtDecode(token);
//     } catch {
//       return null;
//     }
//   }

//   private hasToken(): boolean {
//     return !!localStorage.getItem('token');
//   }

//   /** ✅ API Calls */
//   getUser(userId: string) {
//     return this.http.get(`${this.baseURL}/users/${userId}`, { headers: this.getHeaders() });
//   }

//   deleteUser(email: string) {
//     return this.http.delete(`${this.baseURL}/users/delete/${email}`, { headers: this.getHeaders() });
//   }

//   getUserByEmail(email: string) {
//     const token = localStorage.getItem('token');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.get(`${this.baseURL}/users/${email}`, { headers });
//   }
//   registerUser(userData: any): Observable<any> {
//     return this.http.post<any>(`${this.baseURL}/auth/register-user`, userData);
//   }
// }







import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';  // correct import

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private redirectKey = 'redirectUrl';
  private loginUrl = 'http://localhost:8081/auth/login';
  private baseURL = 'http://localhost:8081';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  private userRoleSubject = new BehaviorSubject<string | null>(localStorage.getItem('userRole'));
  private userNameSubject = new BehaviorSubject<string | null>(localStorage.getItem('userName'));
  private userIdSubject = new BehaviorSubject<string | null>(localStorage.getItem('userId'));
  private userEmailSubject = new BehaviorSubject<string | null>(localStorage.getItem('email'));

  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  userRole$ = this.userRoleSubject.asObservable();
  userName$ = this.userNameSubject.asObservable();
  userId$ = this.userIdSubject.asObservable();
  userEmail$ = this.userEmailSubject.asObservable();

  private logoutMessageSubject = new BehaviorSubject<string | null>(null);
  logoutMessage$ = this.logoutMessageSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });
  }

  /** Login */
  loginUser(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials);
  }

  /** Handle login response */
  handleLogin(token: string, role: string = '', name: string = '', userId: string = '', email: string = ''): void {
    localStorage.setItem('token', token);

    if (role) {
      localStorage.setItem('userRole', role);
      this.userRoleSubject.next(role);
    }
    if (name) {
      localStorage.setItem('userName', name);
      this.userNameSubject.next(name);
    }
    if (userId) {
      localStorage.setItem('userId', userId);
      this.userIdSubject.next(userId);
    }
    if (email) {
      localStorage.setItem('email', email);
      this.userEmailSubject.next(email);
    }

    this.isLoggedInSubject.next(true);
  }

  /** Logout */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');

    this.isLoggedInSubject.next(false);
    this.userRoleSubject.next(null);
    this.userNameSubject.next(null);
    this.userIdSubject.next(null);
    this.userEmailSubject.next(null);

    this.logoutMessageSubject.next("You have successfully logged out");
    setTimeout(() => {
      this.logoutMessageSubject.next(null);
    }, 3000);
  }

  /** Helpers */
  isLoggedIn(): boolean { return this.isLoggedInSubject.value; }
  getToken(): string | null { return localStorage.getItem('token'); }
  getUserRole(): string | null { return this.userRoleSubject.value; }
  getUserName(): string | null { return this.userNameSubject.value; }
  getUserId(): string | null { return this.userIdSubject.value; }
  getEmail(): string | null { return this.userEmailSubject.value; }
  getUserEmail(): string {
    return localStorage.getItem('email') || '';
  }

  /** JWT decode helper */
  decodeToken(): any {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  /** API Calls */
  getUser(userId: string) {
    return this.http.get(`${this.baseURL}/users/${userId}`, { headers: this.getHeaders() });
  }

  deleteUser(email: string) {
    return this.http.delete(`${this.baseURL}/users/delete/${email}`, { headers: this.getHeaders() });
  }

  getUserByEmail(email: string) {
    return this.http.get(`${this.baseURL}/users/${email}`, { headers: this.getHeaders() });
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/auth/register-user`, userData);
  }
}
