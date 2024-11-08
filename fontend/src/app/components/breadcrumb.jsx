import Link from "next/link";
import React from "react";

const BreadcrumbItem = ({ children, active, href }) => {
  return (
    <li className={`breadcrumb-item ${active ? "active" : ""}`}>
      {active ? children : <Link href={href}>{children}</Link>}
    </li>
  );
};

const Breadcrumb = ({ children }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">{children}</ol>
    </nav>
  );
};

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
