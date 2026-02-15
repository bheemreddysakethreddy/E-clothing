import React from "react";

function Loading({ skeleton }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {Array(skeleton)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
          >
            <div>
              <img className="w-full h-50 rounded-2xl bg-gray-300 border-0" />
            </div>

            <div className="p-4 space-y-2">
              <h2 className="w-[60%] h-5 rounded-2xl bg-gray-300"></h2>

              <p className="line-clamp-2 w-[90%] h-7 rounded-xl bg-gray-300"></p>

              <div className="flex items-center justify-between pt-1">
                <p className="bg-gray-300 h-6 w-[33%] rounded-xl"></p>
                <button className="bg-gray-300 h-6 w-[53%] rounded-xl"></button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Loading;
