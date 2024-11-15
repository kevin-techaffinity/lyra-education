export function getDomain(req = null) {

    if (typeof window !== "undefined") {
      return window.location.hostname;
    }
  
    if (req) {
      return req.headers.host;
    }
  
    return null;
}