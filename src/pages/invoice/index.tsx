"use client"

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toPng } from "html-to-image";
import { StudentAddPeyment } from "@/core/services/api/course";


export const Invoice = () => {
    const location = useLocation();
    const navigate = useNavigate();
  
    const [paymentId, setPaymentId] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [courses, setCourses] = useState([]);
    const [coursesId, setCoursesId] = useState([]);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const currentDate = new Date();

    const GetToday = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
    
        const today = `${year}/${month}/${day}T${hours}:${minutes}:${seconds}`;
        return today;
    };
    
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setPaymentId(params.get("paymentId") || "");
        setTotalPrice(Number(params.get("totalPrice")) || 0);
        setCourses(JSON.parse(params.get("courses") || "[]"));
        
        try {
          setCoursesId(JSON.parse(params.get("courseId") || "[]"));
        } catch (error) {
          console.error("Error parsing courseId:", error);
          setCoursesId([]);
        }
      
        setDate(
          currentDate.toLocaleDateString("fa-IR", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })
        );
        setTime(currentDate.toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }));
      }, [location.search]);
  
    const handleDownloadInvoice = () => {
      const invoiceElement = document.getElementById("invoice");
      if (invoiceElement) {
        toPng(invoiceElement)
          .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = `invoice-${paymentId}.png`;
            link.href = dataUrl;
            link.click();
          })
          .catch((err) => console.error("خطا در دانلود فاکتور:", err));
      }
    };

    const handelPaymet = async () => {
        const params = new URLSearchParams(location.search);
        const data = new FormData();
        data.append("Paid" , totalPrice)
        data.append("PaymentInvoiceNumber" , paymentId )
        data.append("CourseId" , coursesId)
        data.append("PeymentDate" , GetToday())
         
        await StudentAddPeyment(data)


    }
  
    return (
      <div className="w-full h-screen flex justify-center bg-gray-100 py-10">
        <div
          id="invoice"
          className="bg-white w-[90%] md:w-[700px] shadow-lg rounded-lg p-5"
        >
          <h1 className="text-center text-green-600 text-2xl font-bold mb-5">
            فاکتور پردات شما
          </h1>
          <p className="text-center text-gray-700 text-xl font-semibold mb-8">
            {totalPrice.toLocaleString()} تومان
          </p>
  
          <div className="border rounded-lg p-4 mb-5 bg-gray-50">
            <p className="flex justify-between text-gray-600">
              <span>تاریخ:</span> <span>{date}</span>
            </p>
            <p className="flex justify-between text-gray-600">
              <span>زمان:</span> <span>{time}</span>
            </p>
            <p className="flex justify-between text-gray-600">
              <span>شماره ارجاع / پیگیری:</span> <span>{paymentId}</span>
            </p>
            <p className="flex justify-between text-gray-600">
              <span>نام پذیرنده:</span> <span>سپهر آکادمی</span>
            </p>
            <p className="flex justify-between text-gray-600">
              <span>نام پرداخت کننده:</span> <span>کاربر گرامی</span>
            </p>
            <p className="flex flex-wrap justify-between text-gray-600">
              <span>نام دوره‌ها:</span>
              <span>
                {courses.map((course, index) => (
                  <span key={index}>
                    {course.courseTitle}
                    {index < courses.length - 1 ? "، " : ""}
                  </span>
                ))}
              </span>
            </p>
          </div>
  
          <div className="flex justify-between mt-10">
            <button
              onClick={() => navigate("/")}
              className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600"
            >
              انصراف
            </button>
            <button
              onClick={handelPaymet}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
            >
              ادامه
            </button>
          </div>
        </div>
      </div>
    );
} 

