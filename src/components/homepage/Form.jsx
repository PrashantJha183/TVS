import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { AiOutlineCheckCircle, AiOutlineClose } from "react-icons/ai";

// Debounce hook (JSX-safe, no generics)
function useDebouncedValue(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

// Basic sanitization (client side) – escape angle brackets to avoid injection-like strings
const sanitize = (str) => {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

const PRODUCTS = [
  "Select a product",
  "Product A",
  "Product B",
  "Product C",
  "Others",
];

// Fixed country metadata (only India)
const COUNTRY = { label: "India", dial: "+91", phoneLength: 10 };

// Toast component
const Toast = ({ message, onClose }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-4 right-4 z-50 flex max-w-sm items-start gap-3 rounded-xl bg-white shadow-lg border p-4"
        >
          <div className="text-green-500 mt-0.5">
            <AiOutlineCheckCircle size={24} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">{message}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="close toast"
            className="text-gray-500 hover:text-gray-700"
          >
            <AiOutlineClose size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Form = React.memo(() => {
  const reduceMotion = useReducedMotion();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    product: PRODUCTS[0],
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const lastSubmitRef = useRef(0);
  const toastTimerRef = useRef(null);

  // Debounced expensive fields
  const debouncedEmail = useDebouncedValue(form.email, 400);
  const debouncedPhone = useDebouncedValue(form.phone, 400);

  // Validation rules
  const validateAll = useCallback(() => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      errs.email = "Email is invalid.";

    const digitsOnly = form.phone.replace(/\D/g, "");
    if (!digitsOnly) errs.phone = "Phone number is required.";
    else if (digitsOnly.length !== COUNTRY.phoneLength)
      errs.phone = `For ${COUNTRY.label}, enter exactly ${COUNTRY.phoneLength} digits.`;

    if (!form.product || form.product === PRODUCTS[0])
      errs.product = "Please select a product.";
    if (!form.message.trim()) errs.message = "Message cannot be empty.";
    else if (form.message.trim().length > 1000)
      errs.message = "Message too long (max 1000 characters).";
    return errs;
  }, [form]);

  // Live feedback from debounced fields (email + phone length)
  useEffect(() => {
    setErrors((prev) => {
      const copy = { ...prev };
      if (debouncedEmail) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(debouncedEmail.trim())) {
          copy.email = "Email format seems invalid.";
        } else {
          delete copy.email;
        }
      }

      const digitsOnly = debouncedPhone.replace(/\D/g, "");
      if (digitsOnly) {
        if (digitsOnly.length !== COUNTRY.phoneLength) {
          //   copy.phone = `For ${COUNTRY.label}, enter exactly ${COUNTRY.phoneLength} digits.`;
          copy.phone = "Incorrect contact number";
        } else {
          delete copy.phone;
        }
      }

      return copy;
    });
  }, [debouncedEmail, debouncedPhone]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  }, []);

  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastMsg("");
    }, 3000);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Throttle: once per 3s
    const now = Date.now();
    if (now - lastSubmitRef.current < 3000) return;
    lastSubmitRef.current = now;

    const validation = validateAll();
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    setSubmitting(true);
    setErrors({});

    const digitsOnly = form.phone.replace(/\D/g, "");

    // Construct payload with fixed India dial code
    const payload = {
      name: form.name.trim(),
      phone: `${COUNTRY.dial}${digitsOnly}`,
      email: form.email.trim().toLowerCase(),
      product: form.product,
      message: sanitize(form.message.trim()),
      submittedAt: new Date().toISOString(),
      country: COUNTRY.label,
    };

    console.log("Contact form submitted payload:", payload);

    try {
      await new Promise((res) => setTimeout(res, 1200));
      setSent(true);
      showToast("Thank you! Your message has been received.");
      setForm({
        name: "",
        phone: "",
        email: "",
        product: PRODUCTS[0],
        message: "",
      });
    } catch (err) {
      setErrors({ general: "Failed to send. Try again later." });
    } finally {
      setSubmitting(false);
      setTimeout(() => setSent(false), 3000);
    }
  };

  const productOptions = useMemo(
    () =>
      PRODUCTS.map((p) => (
        <option key={p} value={p} disabled={p === PRODUCTS[0]}>
          {p}
        </option>
      )),
    []
  );

  // Animation variants
  const containerVariant = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.06,
        ease: "easeOut",
        duration: reduceMotion ? 0 : 0.5,
      },
    },
  };
  const fieldVariant = {
    hidden: { opacity: 0, x: reduceMotion ? 0 : -8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 25,
        duration: reduceMotion ? 0 : undefined,
      },
    },
    error: {
      opacity: 1,
      x: reduceMotion ? 0 : [0, -6, 6, -4, 4, 0],
      transition: { duration: 0.35, ease: "easeInOut" },
    },
  };
  const buttonVariant = {
    idle: { scale: 1 },
    hover: { scale: reduceMotion ? 1 : 1.02 },
    tap: { scale: reduceMotion ? 1 : 0.96 },
  };

  return (
    <>
      <Toast message={toastMsg} onClose={() => setToastMsg("")} />

      <section className="w-full flex flex-col md:flex-row items-center justify-center gap-12 px-6 py-12 bg-white font-nunito">
        {/* Left: informational "Get in Touch" */}
        <motion.div
          className="flex-1 max-w-lg w-full flex flex-col justify-center"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-bold text-gray-800 mb-3">
              Get in Touch
            </h3>
            <p className="text-gray-600 mb-4">
              Choose a product, tell us what you need, and we’ll respond
              quickly. Your information is handled securely and never shared
              without your permission.
            </p>
            <div className="space-y-2">
              <div>
                <strong>Email:</strong>{" "}
                <span className="" style={{ color: "#1d3d85" }}>
                  support@example.com
                </span>
              </div>
              <div>
                <strong>Phone:</strong>{" "}
                <span className="text-gray-700">+91 1234567890</span>
              </div>
              <div>
                <strong>Address:</strong>{" "}
                <span className="text-gray-700">Darbhanga, Bihar, India</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: form side */}
        <motion.div
          className="flex-1 max-w-lg w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={containerVariant}
        >
          <div className="relative bg-gray-50 p-8 rounded-2xl shadow-md overflow-hidden">
            <motion.h2
              className="text-2xl font-semibold mb-4 text-gray-800"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.4 }}
            >
              Contact Us
            </motion.h2>

            <AnimatePresence>
              {errors.general && !sent && (
                <motion.div
                  className="mb-2 text-sm text-red-600"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                >
                  {errors.general}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} noValidate>
              {/* Name */}
              <motion.div
                className="mb-4"
                variants={fieldVariant}
                animate={errors.name ? "error" : "visible"}
                initial="hidden"
              >
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <motion.input
                  name="name"
                  id="name"
                  type="text"
                  autoComplete="off"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d3d85] ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  maxLength={100}
                  whileFocus={reduceMotion ? {} : { scale: 1.01 }}
                />
                {errors.name && (
                  <motion.p
                    className="text-xs text-red-600 mt-1"
                    id="name-error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {errors.name}
                  </motion.p>
                )}
              </motion.div>

              {/* Email */}
              <motion.div
                className="mb-4"
                variants={fieldVariant}
                animate={errors.email ? "error" : "visible"}
                initial="hidden"
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <motion.input
                  name="email"
                  id="email"
                  type="email"
                  autoComplete="off"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d3d85] ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  maxLength={254}
                  whileFocus={reduceMotion ? {} : { scale: 1.01 }}
                />
                {errors.email && (
                  <motion.p
                    className="text-xs text-red-600 mt-1"
                    id="email-error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {errors.email}
                  </motion.p>
                )}
              </motion.div>

              {/* Phone with fixed +91 */}
              <motion.div
                className="mb-4"
                variants={fieldVariant}
                animate={errors.phone ? "error" : "visible"}
                initial="hidden"
              >
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 text-sm select-none">
                    {COUNTRY.dial}
                  </div>
                  <motion.input
                    name="phone"
                    id="phone"
                    type="tel"
                    autoComplete="off"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="1234567890"
                    className={`flex-1 px-4 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#1d3d85] ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    maxLength={COUNTRY.phoneLength}
                    whileFocus={reduceMotion ? {} : { scale: 1.01 }}
                  />
                </div>
                {errors.phone && (
                  <motion.p
                    className="text-xs text-red-600 mt-1"
                    id="phone-error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {errors.phone}
                  </motion.p>
                )}
              </motion.div>

              {/* Product */}
              <motion.div
                className="mb-4"
                variants={fieldVariant}
                animate={errors.product ? "error" : "visible"}
                initial="hidden"
              >
                <label
                  htmlFor="product"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product
                </label>
                <motion.select
                  name="product"
                  id="product"
                  value={form.product}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d3d85] ${
                    errors.product ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-invalid={!!errors.product}
                  aria-describedby={
                    errors.product ? "product-error" : undefined
                  }
                  whileFocus={reduceMotion ? {} : { scale: 1.005 }}
                >
                  {productOptions}
                </motion.select>
                {errors.product && (
                  <motion.p
                    className="text-xs text-red-600 mt-1"
                    id="product-error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {errors.product}
                  </motion.p>
                )}
              </motion.div>

              {/* Message */}
              <motion.div
                className="mb-6"
                variants={fieldVariant}
                animate={errors.message ? "error" : "visible"}
                initial="hidden"
              >
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <motion.textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Describe your requirement..."
                  className={`w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#1d3d85] ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  maxLength={1000}
                  whileFocus={reduceMotion ? {} : { scale: 1.01 }}
                />
                {errors.message && (
                  <motion.p
                    className="text-xs text-red-600 mt-1"
                    id="message-error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {errors.message}
                  </motion.p>
                )}
                <motion.p
                  className="text-xs text-gray-500 mt-1"
                  aria-live="polite"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 1 }}
                >
                  {form.message.length}/1000 characters
                </motion.p>
              </motion.div>

              <motion.button
                type="submit"
                disabled={submitting || sent}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition disabled:opacity-50 flex justify-center items-center gap-2 find-dealer-btn"
                variants={buttonVariant}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                aria-label="Send message"
              >
                {submitting ? "Sending..." : sent ? "Sent" : "Send Message"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </section>
    </>
  );
});

export default Form;
