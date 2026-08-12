function About({ image, about }) {
  return (
    <aside>
      <img src={image} alt="blog logo"></img>
      <p>{about} </p>
    </aside>
  );
}

export default About;
