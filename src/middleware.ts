import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

  //serverde kullanıcı girişi olmadan içerik göstermeme. yani giriş yapılmadan veya istenilen işlem yapılmadan içerik gösterilmez. aynısının client olanını components/counter.tsx dosyasında yaptık. 

const isProtectedRoute = createRouteMatcher(["/mock-users"])

export default clerkMiddleware(async (auth, req)=> {
  if(isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};