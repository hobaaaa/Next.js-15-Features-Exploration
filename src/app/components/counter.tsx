"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { useState } from "react";

export const Counter = () => {
  //client de kullanıcı girişi olmadan içerik göstermeme. yani giriş yapılmadan veya istenilen işlem yapılmadan içerik gösterilmez. aynısının server olanını middleware.ts dosyasında yaptık.
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  // bunun bir de useUser hook u var
  // const {isLoaded, isSignedIn, user} = useUser();
  // bu da bu şekilde

  console.log("Counter component");
  const [count, setCount] = useState(0);

  if (!isLoaded || !userId) {
    return null;
  }
  // if (!isLoaded || !isSignedIn) {
  //   return null;
  // }

  return (
    <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
  );
};
