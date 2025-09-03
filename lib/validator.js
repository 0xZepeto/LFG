const Joi = require('joi');

class EnvValidator {
  validate(config, schema) {
    const errors = [];
    
    // Check required fields
    Object.keys(schema).forEach(key => {
      const fieldSchema = schema[key];
      
      // Required validation
      if (fieldSchema.required && (config[key] === undefined || config[key] === null || config[key] === '')) {
        errors.push(`${key} is required`);
        return;
      }
      
      // Skip validation if field is not required and not provided
      if (config[key] === undefined || config[key] === null || config[key] === '') {
        return;
      }
      
      // Type validation
      if (fieldSchema.type) {
        const typeError = this.validateType(key, config[key], fieldSchema.type);
        if (typeError) {
          errors.push(typeError);
        }
      }
      
      // Custom validation
      if (fieldSchema.validate && typeof fieldSchema.validate === 'function') {
        const customError = fieldSchema.validate(config[key]);
        if (customError) {
          errors.push(`${key}: ${customError}`);
        }
      }
      
      // Enum validation
      if (fieldSchema.enum && !fieldSchema.enum.includes(config[key])) {
        errors.push(`${key} must be one of: ${fieldSchema.enum.join(', ')}`);
      }
      
      // Range validation for numbers
      if (fieldSchema.type === 'number') {
        const num = Number(config[key]);
        if (fieldSchema.min !== undefined && num < fieldSchema.min) {
          errors.push(`${key} must be at least ${fieldSchema.min}`);
        }
        if (fieldSchema.max !== undefined && num > fieldSchema.max) {
          errors.push(`${key} must be at most ${fieldSchema.max}`);
        }
      }
      
      // Length validation for strings
      if (fieldSchema.type === 'string' || typeof config[key] === 'string') {
        const str = String(config[key]);
        if (fieldSchema.minLength !== undefined && str.length < fieldSchema.minLength) {
          errors.push(`${key} must be at least ${fieldSchema.minLength} characters`);
        }
        if (fieldSchema.maxLength !== undefined && str.length > fieldSchema.maxLength) {
          errors.push(`${key} must be at most ${fieldSchema.maxLength} characters`);
        }
      }
      
      // Pattern validation
      if (fieldSchema.pattern && !new RegExp(fieldSchema.pattern).test(String(config[key]))) {
        errors.push(`${key} format is invalid`);
      }
    });
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  validateType(key, value, expectedType) {
    switch (expectedType) {
      case 'string':
        return typeof value === 'string' ? null : `${key} must be a string`;
      case 'number':
        return !isNaN(Number(value)) ? null : `${key} must be a number`;
      case 'boolean':
        return ['true', 'false', true, false].includes(value) ? null : `${key} must be a boolean`;
      case 'json':
        try {
          JSON.parse(value);
          return null;
        } catch {
          return `${key} must be valid JSON`;
        }
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : `${key} must be a valid email`;
      case 'url':
        try {
          new URL(value);
          return null;
        } catch {
          return `${key} must be a valid URL`;
        }
      default:
        return null;
    }
  }
}

module.exports = EnvValidator;
