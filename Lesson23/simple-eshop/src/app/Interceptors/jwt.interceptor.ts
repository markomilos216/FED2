import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';

export const JWTInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const token = localStorage.getItem('token')
  const url = new URL(req.url);
  const path = url.pathname;
  const skipPaths = [
    '/v1/accounts:signInWithPassword',
    '/v1/accounts:signUp',
    '/v1/accounts:sendOobCode'
  ];
  const shouldSkip = skipPaths.some(p => path.endsWith(p));

  if (token && !shouldSkip) {
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(modifiedReq);
  }  
  return next(req);
};