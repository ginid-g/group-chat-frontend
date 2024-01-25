import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth');
  const authToken = !!token ? (JSON.parse(token)?.token as string) : '';

  const authReq = req.clone({
    headers: req.headers.set('Authorization', authToken),
  });
  return next(authReq);
};
