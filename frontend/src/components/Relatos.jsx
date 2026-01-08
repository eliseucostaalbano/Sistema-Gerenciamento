import {testimonialStyles} from '../assets/dummyStyles'
import testimonials from '../assets/dummyTestimonial'

const Relatos = () => {
  return (
    <section className={testimonialStyles.section}>
      <div className={testimonialStyles.container}>

       <div className={testimonialStyles.badge}>
       <div className={testimonialStyles.badgeDot}></div>
       <span className={testimonialStyles.badgeText}>
        Testemunhos de Estudantes
       </span>
       </div>

       <h2 className={testimonialStyles.title}>
        <span className={testimonialStyles.titleGradient}>
          Vozes de Sucesso
        </span>
       </h2>
       
       <p className={testimonialStyles.subtitle}>
        Descobra com nossos estudantes transformaram suas carreiras com projetos hands-on e mentoria expert
       </p>
      </div>
    </section>
  )
}

export default Relatos