import { useState } from "react";
import { useParams } from "react-router-dom";
import { DataProvider } from "../../Core/DataProvider";

interface DownloadLink {
  href: string;
  label: string;
}

const GameDownload = () => {
  const { slug } = useParams();
  const [downloadLinksArray, setDownloadLinksArray] = useState<DownloadLink[]>(
    []
  );
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSearchGame = async () => {
    setSearched(true);
    setLoading(true);
    const gameName = slug || "";
    const url = `https://cors-anywhere-f5lo.onrender.com/https://par30games.net/?s="${encodeURIComponent(
      gameName
    )}"`;

    try {
      const response = await DataProvider.get<string>(url);
      const parser = new DOMParser();
      const doc = parser.parseFromString(response, "text/html");
      const links = doc.querySelectorAll("a");
      const foundLink = Array.from(links).find(
        (link) =>
          link?.textContent?.includes("دانلود بازی") &&
          new RegExp(gameName.split(" ").join("-"), "i").test(link.href)
      );
      foundLink && (await getGamePageLinks(foundLink.href));
    } catch (error) {
      setError("Error to finding the links");
    } finally {
      setLoading(false);
    }
  };
  const getGamePageLinks = async (href: string) => {
    const parser = new DOMParser();
    try {
      const response = await DataProvider.get<string>(
        `https://cors-anywhere-f5lo.onrender.com/${href}`
      );
      const linkedDoc = parser.parseFromString(response, "text/html");
      const downloadLinks = linkedDoc.querySelectorAll("a");
      downloadLinks.forEach((link) => {
        if (new RegExp("حجم فایل").test(link?.textContent || "")) {
          setDownloadLinksArray((prevLinks) => [
            ...prevLinks,
            { href: link.href, label: link.textContent || "" },
          ]);
        }
      });
    } catch (error) {
      setError("Error to finding the links");
    } finally {
      setLoading(false);
    }
  };
  const handleDownloadLinks = () => {
    const blob = new Blob(
      [downloadLinksArray.map((link) => link.href).join("\n")],
      {
        type: "text/plain",
      }
    );
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "download_links.txt";
    downloadLink.click();
  };

  return (
    <div className="mt-4">
      {searched ? (
        <>
          <p className="text-slate-500">Download Links</p>
          {loading ? (
            <span className="loading loading-infinity loading-lg"></span>
          ) : error ? (
            error
          ) : downloadLinksArray.length > 0 ? (
            <ul>
              {downloadLinksArray.map((link, index) => (
                <li>
                  <a key={index} href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  className="btn btn-link px-0"
                  onClick={handleDownloadLinks}
                >
                  Download the links as a text file
                </button>
              </li>
            </ul>
          ) : (
            <p>No links found</p>
          )}
        </>
      ) : (
        <button
          className="btn btn-secondary btn-outline"
          onClick={handleSearchGame}
        >
          Search For Download Links
        </button>
      )}
    </div>
  );
};

export default GameDownload;
