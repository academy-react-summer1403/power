"use client";

import notificationapi from "notificationapi-node-server-sdk";
import { getallbypgCourseList } from "@/core/services/api/course";

notificationapi.init(
  "pjei3i98zjgg9zp3iddfro2e65", 
  "mx2e8o1xfmv3d9ctabp0dnwbvniusgsu8x79deo92vhb1i6c403b8vw4mp" 
);

let previousCount = 0;

const checkAndNotifyCourses = async () => {
  try {
    const { totalCount } = await getallbypgCourseList(
      "", 
      "", 
      [], 
      "", 
      "", 
      1000000, 
      0, 
      1 
    );

    if (totalCount > previousCount) {
      await notificationapi.send({
        notificationId: "__________________",
        user: {
          id: "mohmmadjalali44@gmail.com",
          email: "mohmmadjalali44@gmail.com",
          number: "+15005550006", 
        },
        mergeTags: {
          commentId: "NewCoursesAvailable",
        },
      });

      console.log("Notification sent to user about new courses.");
    }

    previousCount = totalCount;
  } catch (error) {
    console.error("Error checking or notifying courses:", error);
  }
};

export const StartCourseNotifier = () => {
  checkAndNotifyCourses(); 
  setInterval(checkAndNotifyCourses, 60 * 60 * 1000); 
};
