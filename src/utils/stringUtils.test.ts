import { describe, it, expect } from "vitest";
import { snakeToTitleCase, isValidURL } from "./stringUtils";

describe("stringUtils", () => {
  describe("snakeToTitleCase", () => {
    it("should convert snake_case to Title Case", () => {
      const result = snakeToTitleCase("hello_world");
      expect(result).toBe("Hello World");
    });

    it("should handle single-word input", () => {
      const result = snakeToTitleCase("hello");
      expect(result).toBe("Hello");
    });

    it("should handle empty string input", () => {
      const result = snakeToTitleCase("");
      expect(result).toBe("");
    });

    it("should handle strings with multiple underscores", () => {
      const result = snakeToTitleCase("this_is_a_test");
      expect(result).toBe("This Is A Test");
    });

    it("should handle strings with leading and trailing underscores", () => {
      const result = snakeToTitleCase("_leading_and_trailing_");
      expect(result).toBe("Leading And Trailing");
    });

    it("should handle strings with consecutive underscores", () => {
      const result = snakeToTitleCase("consecutive__underscores");
      expect(result).toBe("Consecutive Underscores");
    });
  });

  describe("isValidURL", () => {
    it("should return true for a valid http URL", () => {
      const result = isValidURL("http://example.com");
      expect(result).toBe(true);
    });

    it("should return true for a valid https URL", () => {
      const result = isValidURL("https://example.com");
      expect(result).toBe(true);
    });

    it("should return false for an invalid URL missing protocol", () => {
      const result = isValidURL("example.com");
      expect(result).toBe(false);
    });

    it("should return false for an empty string", () => {
      const result = isValidURL("");
      expect(result).toBe(false);
    });

    it("should return false for a string with only spaces", () => {
      const result = isValidURL("   ");
      expect(result).toBe(false);
    });

    it("should return false for an invalid URL with random characters", () => {
      const result = isValidURL("invalid_url!@#");
      expect(result).toBe(false);
    });

    it("should return true for a URL with query parameters", () => {
      const result = isValidURL("https://example.com?query=param");
      expect(result).toBe(true);
    });

    it("should return false for a URL without a domain", () => {
      const result = isValidURL("http://");
      expect(result).toBe(false);
    });

    it("should return true for a URL with a subdomain", () => {
      const result = isValidURL("https://subdomain.example.com");
      expect(result).toBe(true);
    });

    it("should return false for a URL with unsupported protocol", () => {
      const result = isValidURL("ftp://example.com");
      expect(result).toBe(false);
    });
  });
});
