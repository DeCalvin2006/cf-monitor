import { useRouter } from "next/router"
import { Container, Form, Button } from "react-bootstrap"

export default function Home () {

  const router = useRouter();
  console.log(router.query);

  return (
    <Container>
      {/* <Form>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="name" placeholder="Enter User Handle" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          发射！
        </Button>
      </Form> */}
      <h2>
        这里是使用说明的喵
      </h2>
      <hr />
      <p>
        在URL后附加要监视的喵
      </p>
      <p>
        切换用户的时候可能会卡成上一个人，这时候刷新喵就好
      </p>
    </Container>
  )
}