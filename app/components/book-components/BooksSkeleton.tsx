function BooksSkeleton() {
  const placeholders = Array.from({ length: 5 });

  return (
    <div className="recommended__books--skeleton-wrapper">
      {placeholders.map((_, index) => (
        <div key={index} className="recommended__books--skeleton">
          <div className="book__image--skeleton skeleton" />
          <div className="skeleton" style={{ height: "16px", width: "80%", margin: "8px 0" }} />
          <div className="skeleton" style={{ height: "14px", width: "60%", marginBottom: "6px" }} />
          <div className="skeleton" style={{ height: "12px", width: "50%", marginBottom: "12px" }} />

          <div className="recommended__book--details-wrapper">
            <div className="recommended__book--details">
              <div className="skeleton" style={{ width: "16px", height: "16px", borderRadius: "50%" }} />
              <div className="skeleton" style={{ height: "10px", width: "40%", marginLeft: "6px" }} />
            </div>
            <div className="recommended__book--details">
              <div className="skeleton" style={{ width: "16px", height: "16px", borderRadius: "50%" }} />
              <div className="skeleton" style={{ height: "10px", width: "30%", marginLeft: "6px" }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BooksSkeleton;
