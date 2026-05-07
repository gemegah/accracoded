interface NetworkInformation {
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g' | string;
}

interface Navigator {
  connection?: NetworkInformation;
}
