import { useAccount } from 'wagmi'

const ChatBar = ({ conversationId }: { conversationId: string }) => {
  const { isDisconnected, address: userAddress, isConnecting } = useAccount()

  if (isConnecting) {
    return <div>Loading</div>
  }

  return (
    <>
      {isDisconnected ? (
        <>
          <iframe className="flex h-[calc(100%-3.6rem)]" src={`https://stingray-app-u9f8x.ondigitalocean.app/${conversationId}?isCastr=${true}`} />
          <p className="h-14">Connect your account to chat</p>
        </>
      ) : (
          <iframe
            className="h-full"
            src={`https://stingray-app-u9f8x.ondigitalocean.app/${conversationId}?isCastr=${false}&address=${userAddress}`}
          />
      )}
    </>
  )
}

export default ChatBar
