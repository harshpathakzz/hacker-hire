export const getLanguageFromExtension = (fileExtension: string) => {
    switch (fileExtension) {
      case "js":
      case "jsx":
        return "javascript";
      case "ts":
      case "tsx":
        return "typescript";
      case "css":
        return "css";
      case "html":
        return "html";
      case "md":
        return "markdown";
      case "py":
        return "python";
      case "java":
        return "java";
      case "cpp":
      case "cc":
      case "cxx":
        return "cpp";
      case "c":
        return "c";
      case "cs":
        return "csharp";
      case "go":
        return "go";
      case "rb":
        return "ruby";
      case "php":
        return "php";
      case "swift":
        return "swift";
      case "m":
        return "objective-c";
      case "sh":
        return "bash";
      case "sql":
        return "sql";
      case "xml":
        return "xml";
      case "yaml":
      case "yml":
        return "yaml";
      case "json":
        return "json";
      default:
        return "javascript";
    }
  };
  
