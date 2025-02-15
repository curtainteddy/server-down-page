import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Instagram, Linkedin, Github } from "lucide-react"

const socialIcons = [
  { Icon: Github, href: "https://github.com/curtainteddy", label: "GitHub" },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/peshalsedhai/", label: "LinkedIn" },
  { Icon: Instagram, href: "https://www.instagram.com/peshal0/", label: "Instagram" },
  { Icon: Facebook, href: "https://www.facebook.com/peshal0/", label: "Facebook" },
]
export default function WindowsTaskbar() {
  return (
    <motion.div
      className="fixed bottom-8 transform -translate-x-1/2 bg-black/20 backdrop-blur-xl rounded-2xl px-6 py-4 z-50 border border-white/10 min-w-[320px]"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="flex items-center justify-center gap-6">
        {socialIcons.map(({ Icon, href, label }) => (
          <Link key={href} href={href} passHref target="_blank" rel="noopener noreferrer" aria-label={label}>
            <motion.div
              className="relative group bg-amber-950/50 hover:bg-amber-800/50 w-14 h-14 flex items-center justify-center rounded-xl transition-colors duration-200 border border-amber-500/20"
              whileHover={{
                y: -60,
                scale: 3,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-6 h-6 text-amber-200/70 group-hover:text-amber-100" />
              <motion.div
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-400 rounded-full opacity-0"
                initial={false}
                animate={{
                  opacity: 0,
                  y: -5,
                  x: -4,
                  width: "10px",
                  height: "10px",
                }}
                whileHover={{
                  opacity: 0.2,
                  transition: { duration: 0.2 },
                }}
              />
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}