import { ValidationError } from "../../domain/errors/DomainError";

export const SchemaValidator = {
  validateRegister(body: any) {
    if (!body.email || typeof body.email !== "string" || !body.email.includes("@")) {
      throw new ValidationError("Email inválido o ausente");
    }
    if (!body.password || typeof body.password !== "string" || body.password.length < 6) {
      throw new ValidationError("La contraseña debe tener al menos 6 caracteres");
    }
    if (!body.name || typeof body.name !== "string" || body.name.trim().length === 0) {
      throw new ValidationError("El nombre es requerido y no puede estar vacío");
    }
  },

  validateLogin(body: any) {
    if (!body.email || typeof body.email !== "string") {
      throw new ValidationError("El email es requerido");
    }
    if (!body.password || typeof body.password !== "string") {
      throw new ValidationError("La contraseña es requerida");
    }
  },

  validateUpdateProfile(body: any) {
    if (body.email !== undefined && (typeof body.email !== "string" || !body.email.includes("@"))) {
      throw new ValidationError("Email proporcionado es inválido");
    }
    if (body.name !== undefined && (typeof body.name !== "string" || body.name.trim().length === 0)) {
      throw new ValidationError("El nombre no puede estar vacío");
    }
  },

  validateCreateProduct(body: any) {
    if (!body.name || typeof body.name !== "string" || body.name.trim().length === 0) {
      throw new ValidationError("El nombre del producto es requerido");
    }
    if (body.price === undefined || typeof body.price !== "number" || body.price <= 0) {
      throw new ValidationError("El precio debe ser un número mayor a 0");
    }
    if (!body.description || typeof body.description !== "string") {
      throw new ValidationError("La descripción es requerida");
    }
    if (!body.category || typeof body.category !== "string") {
      throw new ValidationError("La categoría es requerida");
    }
    if (!body.imageUrl || typeof body.imageUrl !== "string") {
      throw new ValidationError("La URL de la imagen es requerida");
    }
  },

  validateUpdateProduct(body: any) {
    if (body.name !== undefined && (typeof body.name !== "string" || body.name.trim().length === 0)) {
      throw new ValidationError("El nombre del producto no puede estar vacío");
    }
    if (body.price !== undefined && (typeof body.price !== "number" || body.price <= 0)) {
      throw new ValidationError("El precio debe ser un número mayor a 0");
    }
    if (body.showInDiary !== undefined && typeof body.showInDiary !== "boolean") {
      throw new ValidationError("showInDiary debe ser un booleano");
    }
  },

  validateAddToCart(body: any) {
    if (!body.productId || typeof body.productId !== "string") {
      throw new ValidationError("productId es requerido");
    }
    if (body.quantity === undefined || typeof body.quantity !== "number" || body.quantity <= 0) {
      throw new ValidationError("La cantidad debe ser un número entero mayor a 0");
    }
  },

  validateCreateOrder(body: any) {
    if (!body.address || typeof body.address !== "string" || body.address.trim().length === 0) {
      throw new ValidationError("La dirección de entrega es requerida");
    }
    if (!body.phone || typeof body.phone !== "string" || body.phone.trim().length === 0) {
      throw new ValidationError("El teléfono de contacto es requerido");
    }
  },

  validateDiaryEntry(body: any) {
    if (!body.title || typeof body.title !== "string" || body.title.trim().length === 0) {
      throw new ValidationError("El título es requerido");
    }
    if (!body.content || typeof body.content !== "string" || body.content.trim().length === 0) {
      throw new ValidationError("El contenido de la entrada es requerido");
    }
    if (body.rating !== undefined && (typeof body.rating !== "number" || body.rating < 1 || body.rating > 5)) {
      throw new ValidationError("La valoración de la piel (rating) debe ser un número del 1 al 5");
    }
  }
};
