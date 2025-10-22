function InsideBookSkeleton() {
  return (
    <div className="inner__book--skeleton">
      <div className="inner__book--skeleton-img">
        <div className="book__image--skeleton skeleton" style={{ width: "120px", height: "180px" }} />
      </div>
      <div className="inner__book--skeleton-content">
        <div className="skeleton" style={{ height: "24px", width: "60%", marginBottom: "12px" }} />
        <div className="skeleton" style={{ height: "18px", width: "40%", marginBottom: "8px" }} />
        <div className="skeleton" style={{ height: "12px", width: "90%", marginBottom: "6px" }} />
        <div className="skeleton" style={{ height: "12px", width: "80%", marginBottom: "6px" }} />
        <div className="skeleton" style={{ height: "12px", width: "85%" }} />
      </div>
    </div>
  );
}

export default InsideBookSkeleton;
