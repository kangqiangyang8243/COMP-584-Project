import React from "react";
import BookKeepForm from "../components/BookKeepForm";
import BookKeepShow from "../components/BookKeepShow";

function BookKeepingPage() {
  return (
    <div className="pt-[100px] bg-slate-50 w-full">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 p-10">
        {/* record form */}
        <BookKeepForm />
        {/* record show */}
        <BookKeepShow />
      </div>
    </div>
  );
}

export default BookKeepingPage;
