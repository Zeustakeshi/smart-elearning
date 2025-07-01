package response

type TokenResponse struct {
	Value    string `json:"value"`
	ExpireIn int    `json:"expire_in"`
}
