import React from "react";

const user = {
  name: "Hedy Lamarr",
  imageUrl: "https://i.imgur.com/yXOvdOSs.jpg",
  imageSize: 90,
  Department: "BCA",
  semester: 3,
};

const ProfilePage = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100 shadow-lg rounded-lg p-6 w-64 mx-auto mt-10">
      <img
        className="rounded-full border-4 border-blue-500"
        src={user.imageUrl}
        alt={"Photo of " + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize,
        }}
      />
      <h1 className="text-xl font-bold text-gray-800 mt-4">{user.name}</h1>
      <h2 className="text-gray-600">Department: {user.Department}</h2>
      <h2 className="text-gray-600">Semester: {user.semester}</h2>
    </div>
  );
};

export default ProfilePage;
