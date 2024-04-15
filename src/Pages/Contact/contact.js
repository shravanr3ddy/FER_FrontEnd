import React from "react";
import emailjs from "emailjs-com";
import { useForm } from "react-hook-form";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Sending email
    // PHj1F-kft9qic7ZXN
    // service_4io5ppz
    // template_c3hqfok
    emailjs
      .send("service_5gwphjn", "template_j5t96cm", data, "jcXReO4F6btRTJP33")
      .then(
        (result) => {
          alert("Message sent successfully");
          console.log(result.text);
        },
        (error) => {
          alert("Failed to send the message, please try again");
          console.log(error.text);
        }
      );
  };

  return (
    <>
      <section id="contact" className="py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card p-4">
                <div className="card-body">
                  <h4>Get In Touch</h4>
                  <h4>Address</h4>
                  <p>1400 Washington Ave, Albany, NY 12222</p>
                  <h4>Email</h4>
                  <p>samhithauppalapati4@gmail.com</p>
                  <h4>Phone</h4>
                  <p>(518) 442-3300</p>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <form onSubmit={handleSubmit(onSubmit)} className="card p-4">
                <div className="card-body">
                  <h3 className="text-center">
                    Please fill out this form to contact us
                  </h3>
                  <hr />
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        {...register("firstName", { required: true })}
                      />
                      {errors.firstName && (
                        <span className={"error"}>First name is required</span>
                      )}
                    </div>
                    <div className="col-md-6 form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        {...register("lastName", { required: true })}
                      />
                      {errors.lastName && (
                        <span className={"error"}>Last name is required</span>
                      )}
                    </div>
                    <div className="col-md-6 form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        {...register("email", { required: true })}
                      />
                      {errors.email && (
                        <span className={"error"}>Email is required</span>
                      )}
                    </div>
                    <div className="col-md-6 form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone Number"
                        {...register("phoneNumber")}
                      />
                    </div>
                    <div className="col-md-12 form-group">
                      <textarea
                        className="form-control"
                        placeholder="Message"
                        {...register("message", { required: true })}
                      ></textarea>
                      {errors.message && (
                        <span className={"error"}>Message is required</span>
                      )}
                    </div>
                    <div className="col-md-12 form-group">
                      <input
                        type="submit"
                        value="Submit"
                        className="btn btn-outline-custom_primary btn-block"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
