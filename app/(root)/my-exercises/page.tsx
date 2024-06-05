import Image from 'next/image'

type Props = {}

const Page: React.FC<Props> = ({}) => {
  return (
    <div>
      Meine Übungen
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/stv-app-8daf1.appspot.com/o/50815.png?alt=media&token=b2fc4b9b-fefd-4c77-ab56-851400afc72e"
        alt="test"
        width={500}
        height={500}
      />
    </div>
  )
}

export default Page
