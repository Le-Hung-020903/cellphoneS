import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 w-100">
      <div className="text-center">
        <div>
          <Image
            width={400}
            height={400}
            src={"/images/icon/404.png"}
            alt="404 not found"
            className="img-fluid"
          />
        </div>
        <div className="">
          <p className="fs-1">
            <span className="text-danger">Opps!</span> Page not found.
          </p>
          <p className="lead fs-3">
            The page you’re looking for doesn’t exist.
          </p>
          <Link href="/" className="btn btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
